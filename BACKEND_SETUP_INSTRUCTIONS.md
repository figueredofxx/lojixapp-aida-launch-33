
# Instruções Completas para Configuração do Backend LogixApp
## Servidor Ubuntu 20.04 LTS Limpo

### 1. Preparação Inicial do Sistema

```bash
# Atualizar o sistema
sudo apt update && sudo apt upgrade -y

# Instalar dependências básicas
sudo apt install -y curl wget git build-essential software-properties-common apt-transport-https ca-certificates gnupg lsb-release
```

### 2. Instalação do Node.js (versão 18 LTS)

```bash
# Adicionar repositório NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Instalar Node.js
sudo apt install -y nodejs

# Verificar instalação
node --version
npm --version
```

### 3. Instalação do PostgreSQL

```bash
# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Iniciar e habilitar o serviço
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Configurar senha do usuário postgres
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'sua_senha_forte_aqui';"

# Criar banco de dados para a aplicação
sudo -u postgres createdb logixapp_db
```

### 4. Instalação do PM2 (Process Manager)

```bash
# Instalar PM2 globalmente
sudo npm install -g pm2

# Configurar PM2 para iniciar automaticamente
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $(whoami) --hp $(eval echo ~$(whoami))
```

### 5. Configuração do Nginx

```bash
# Instalar Nginx
sudo apt install -y nginx

# Iniciar e habilitar o serviço
sudo systemctl start nginx
sudo systemctl enable nginx

# Configurar firewall (se necessário)
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw --force enable
```

### 6. Configuração SSL com Let's Encrypt

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Gerar certificados SSL (substitua seu-dominio.com)
sudo certbot --nginx -d api.lojixapp.com -d dash.lojixapp.com
```

### 7. Estrutura do Projeto Backend

```bash
# Criar diretório do projeto
sudo mkdir -p /var/www/logixapp-backend
sudo chown -R $(whoami):$(whoami) /var/www/logixapp-backend
cd /var/www/logixapp-backend

# Inicializar projeto Node.js
npm init -y

# Instalar dependências principais
npm install express cors helmet morgan compression dotenv bcryptjs jsonwebtoken
npm install prisma @prisma/client pg stripe mercadopago
npm install multer sharp qrcode pdf-kit nodemailer
npm install express-rate-limit express-validator
npm install socket.io redis ioredis

# Instalar dependências de desenvolvimento
npm install -D nodemon typescript @types/node @types/express
npm install -D @types/bcryptjs @types/jsonwebtoken @types/pg
npm install -D @types/multer @types/sharp @types/qrcode
```

### 8. Configuração do Prisma

```bash
# Inicializar Prisma
npx prisma init

# Criar schema básico do banco
```

Arquivo `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          String   @id @default(cuid())
  email       String   @unique
  password    String
  name        String
  cpfCnpj     String   @unique
  phone       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  stores      Store[]
  role        Role     @default(OWNER)
  
  @@map("users")
}

model Store {
  id          String   @id @default(cuid())
  name        String
  cnpj        String?  @unique
  address     String
  city        String
  state       String
  zipCode     String
  phone       String
  email       String
  ownerId     String
  owner       User     @relation(fields: [ownerId], references: [id])
  products    Product[]
  categories  Category[]
  brands      Brand[]
  sales       Sale[]
  customers   Customer[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("stores")
}

model Category {
  id          String    @id @default(cuid())
  name        String
  description String?
  storeId     String
  store       Store     @relation(fields: [storeId], references: [id])
  products    Product[]
  createdAt   DateTime  @default(now())
  
  @@map("categories")
}

model Brand {
  id          String    @id @default(cuid())
  name        String
  description String?
  storeId     String
  store       Store     @relation(fields: [storeId], references: [id])
  products    Product[]
  createdAt   DateTime  @default(now())
  
  @@map("brands")
}

model Product {
  id           String      @id @default(cuid())
  name         String
  description  String?
  price        Decimal
  cost         Decimal?
  warranty     Int         // dias de garantia
  controlType  ControlType
  state        ProductState @default(NEW)
  categoryId   String
  category     Category    @relation(fields: [categoryId], references: [id])
  brandId      String
  brand        Brand       @relation(fields: [brandId], references: [id])
  storeId      String
  store        Store       @relation(fields: [storeId], references: [id])
  stock        Stock[]
  saleItems    SaleItem[]
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
  
  @@map("products")
}

model Stock {
  id          String   @id @default(cuid())
  productId   String
  product     Product  @relation(fields: [productId], references: [id])
  imei        String?  @unique
  serialNumber String?
  barcode     String?
  quantity    Int      @default(1)
  isAvailable Boolean  @default(true)
  createdAt   DateTime @default(now())
  
  @@map("stock")
}

model Customer {
  id          String   @id @default(cuid())
  name        String
  cpfCnpj     String   @unique
  email       String?
  phone       String?
  address     String?
  city        String?
  state       String?
  zipCode     String?
  birthDate   DateTime?
  storeId     String
  store       Store    @relation(fields: [storeId], references: [id])
  sales       Sale[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("customers")
}

model Sale {
  id          String      @id @default(cuid())
  customerId  String?
  customer    Customer?   @relation(fields: [customerId], references: [id])
  storeId     String
  store       Store       @relation(fields: [storeId], references: [id])
  total       Decimal
  discount    Decimal     @default(0)
  paymentMethod PaymentMethod
  observations String?
  items       SaleItem[]
  createdAt   DateTime    @default(now())
  
  @@map("sales")
}

model SaleItem {
  id        String  @id @default(cuid())
  saleId    String
  sale      Sale    @relation(fields: [saleId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  price     Decimal
  
  @@map("sale_items")
}

enum Role {
  OWNER
  EMPLOYEE
  ADMIN
}

enum ControlType {
  IMEI
  SERIAL
  BARCODE
  QUANTITY
}

enum ProductState {
  NEW
  USED
}

enum PaymentMethod {
  CASH
  CARD
  PIX
  TRADE
}
```

### 9. Estrutura de Arquivos do Backend

```bash
# Criar estrutura de pastas
mkdir -p src/{controllers,middleware,routes,services,utils,types}
mkdir -p src/controllers/{auth,products,sales,customers,reports}
mkdir -p uploads/{products,logos}
```

### 10. Arquivo de Configuração Principal

Arquivo `.env`:
```env
# Database
DATABASE_URL="postgresql://postgres:sua_senha_forte_aqui@localhost:5432/logixapp_db"

# JWT
JWT_SECRET="seu_jwt_secret_muito_forte_aqui_com_pelo_menos_64_caracteres"
JWT_EXPIRES_IN="30d"

# Server
PORT=3001
NODE_ENV="production"

# Stripe (Pagamentos)
STRIPE_SECRET_KEY="sk_live_seu_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_live_seu_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_seu_webhook_secret"

# Email (Nodemailer)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="seu-email@gmail.com"
SMTP_PASS="sua-senha-app-gmail"

# Redis (Cache)
REDIS_URL="redis://localhost:6379"

# Upload limits
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES="image/jpeg,image/png,image/webp"
```

### 11. Configuração do Nginx

Arquivo `/etc/nginx/sites-available/logixapp`:
```nginx
# API Backend
server {
    listen 80;
    server_name api.lojixapp.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.lojixapp.com;

    ssl_certificate /etc/letsencrypt/live/api.lojixapp.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.lojixapp.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # CORS
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
        add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization";
    }

    # Handle preflight requests
    location ~* ^.+\.(OPTIONS)$ {
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
        add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization";
        return 204;
    }

    # Static files
    location /uploads/ {
        alias /var/www/logixapp-backend/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# Frontend Dashboard
server {
    listen 80;
    server_name dash.lojixapp.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name dash.lojixapp.com;

    ssl_certificate /etc/letsencrypt/live/dash.lojixapp.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dash.lojixapp.com/privkey.pem;

    root /var/www/logixapp-frontend/dist;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 12. Configuração do PM2

Arquivo `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'logixapp-api',
    script: 'dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max_old_space_size=1024'
  }]
}
```

### 13. Scripts de Deploy

Arquivo `package.json` (scripts):
```json
{
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate deploy",
    "prisma:seed": "tsx prisma/seed.ts",
    "deploy": "npm run build && pm2 restart logixapp-api"
  }
}
```

### 14. Configuração de Backup Automático

Arquivo `/home/usuario/backup-db.sh`:
```bash
#!/bin/bash
BACKUP_DIR="/home/usuario/backups"
DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/logixapp_backup_$DATE.sql"

# Criar diretório se não existir
mkdir -p $BACKUP_DIR

# Fazer backup
pg_dump -h localhost -U postgres -d logixapp_db > $BACKUP_FILE

# Compactar backup
gzip $BACKUP_FILE

# Manter apenas os últimos 7 backups
find $BACKUP_DIR -name "logixapp_backup_*.sql.gz" -mtime +7 -delete

echo "Backup concluído: $BACKUP_FILE.gz"
```

### 15. Crontab para Backups Automáticos

```bash
# Editar crontab
crontab -e

# Adicionar linha para backup diário às 2h da manhã
0 2 * * * /home/usuario/backup-db.sh
```

### 16. Comandos de Deploy Final

```bash
# Navegar para o diretório do projeto
cd /var/www/logixapp-backend

# Gerar cliente Prisma
npm run prisma:generate

# Executar migrações
npm run prisma:migrate

# Compilar TypeScript
npm run build

# Criar diretório de logs
mkdir -p logs

# Iniciar aplicação com PM2
pm2 start ecosystem.config.js

# Salvar configuração PM2
pm2 save

# Habilitar sites Nginx
sudo ln -s /etc/nginx/sites-available/logixapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Verificar status dos serviços
sudo systemctl status postgresql
sudo systemctl status nginx
pm2 status
```

### 17. Monitoramento e Logs

```bash
# Ver logs em tempo real
pm2 logs logixapp-api

# Ver status detalhado
pm2 show logixapp-api

# Reiniciar aplicação
pm2 restart logixapp-api

# Ver logs do Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 18. Segurança Adicional

```bash
# Instalar fail2ban
sudo apt install -y fail2ban

# Configurar fail2ban para Nginx
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Editar configuração
sudo nano /etc/fail2ban/jail.local
```

### 19. Configuração de Domínio

1. **Configurar DNS no provedor do domínio:**
   - `api.lojixapp.com` → IP do servidor
   - `dash.lojixapp.com` → IP do servidor

2. **Aguardar propagação DNS (até 48h)**

3. **Gerar certificados SSL:**
```bash
sudo certbot --nginx -d api.lojixapp.com -d dash.lojixapp.com
```

### 20. Teste Final

```bash
# Testar API
curl https://api.lojixapp.com/health

# Testar frontend
curl https://dash.lojixapp.com
```

---

## Estrutura Final de Arquivos

```
/var/www/logixapp-backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── index.ts
├── uploads/
├── logs/
├── .env
├── ecosystem.config.js
└── package.json
```

---

## Observações Importantes

1. **Segurança:** Sempre use senhas fortes e mantenha as dependências atualizadas
2. **Backup:** Configure backups automáticos do banco de dados
3. **Monitoramento:** Use PM2 e logs para monitorar a aplicação
4. **SSL:** Mantenha os certificados SSL sempre atualizados
5. **Firewall:** Configure adequadamente as regras de firewall
6. **Updates:** Mantenha o sistema operacional sempre atualizado

Este guia fornece uma base sólida para deploy em produção da LogixApp.
