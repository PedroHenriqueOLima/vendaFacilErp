# VendaFacilErp

VendaFacilErp é um sistema de gestão desenvolvido em PHP utilizando o framework CodeIgniter. Ele também faz uso de HTML, CSS e JavaScript para a interface do usuário e MySQL como banco de dados. O sistema é projetado para ser hospedado em um servidor Windows utilizando o XAMPP.

## Sumário

1. [Requisitos](#requisitos)
2. [Instalação do XAMPP](#instalação-do-xampp)
3. [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
4. [Instalação do Sistema VendaFacilErp](#instalação-do-sistema-vendafacilerp)
5. [Configuração do CodeIgniter](#configuração-do-codeigniter)
6. [Iniciar o Servidor](#iniciar-o-servidor)
7. [Acesso ao Sistema](#acesso-ao-sistema)

## Requisitos

- Windows OS
- XAMPP (versão mais recente recomendada)
- Navegador web moderno (Google Chrome, Firefox, etc.)

## Instalação do XAMPP

1. **Baixar o XAMPP:**
   - Acesse o site oficial do XAMPP: [XAMPP Download](https://www.apachefriends.org/index.html)
   - Baixe a versão mais recente do XAMPP para Windows.

2. **Instalar o XAMPP:**
   - Execute o instalador baixado e siga as instruções na tela.
   - Selecione os componentes necessários (Apache, MySQL, PHPMyAdmin, etc.).
   - Conclua a instalação e inicie o XAMPP Control Panel.

3. **Iniciar os serviços Apache e MySQL:**
   - No XAMPP Control Panel, clique em "Start" para Apache e MySQL.

## Configuração do Banco de Dados

1. **Acessar o PHPMyAdmin:**
   - Abra o navegador web e vá para [http://localhost/phpmyadmin](http://localhost/phpmyadmin).

2. **Criar um banco de dados:**
   - Clique em "New" no menu à esquerda.
   - Nomeie o banco de dados como `vendafacil_db` e clique em "Create".

## Instalação do Sistema VendaFacilErp

1. **Baixar o VendaFacilErp:**
   - Faça o download do código-fonte do VendaFacilErp do repositório GitHub: [VendaFacilErp GitHub](https://github.com/username/vendafacilerp)

2. **Extrair os arquivos:**
   - Extraia o conteúdo do arquivo baixado para a pasta `htdocs` do XAMPP. Por padrão, o caminho é `C:\xampp\htdocs\`.

3. **Configuração do CodeIgniter:**

## Configuração do CodeIgniter

1. **Configurar o arquivo `config.php`:**
   - Navegue até a pasta `application/config` dentro da pasta do VendaFacilErp.
   - Abra o arquivo `config.php` em um editor de texto.
   - Configure a base URL:
     ```php
     $config['base_url'] = 'http://localhost/vendafacilerp/';
     ```

2. **Configurar o banco de dados:**
   - Abra o arquivo `database.php` na pasta `application/config`.
   - Configure as informações de conexão com o banco de dados:
     ```php
     $db['default'] = array(
         'dsn'   => '',
         'hostname' => 'localhost',
         'username' => 'root',
         'password' => '',
         'database' => 'vendafacil_db',
         'dbdriver' => 'mysqli',
         'dbprefix' => '',
         'pconnect' => FALSE,
         'db_debug' => (ENVIRONMENT !== 'production'),
         'cache_on' => FALSE,
         'cachedir' => '',
         'char_set' => 'utf8',
         'dbcollat' => 'utf8_general_ci',
         'swap_pre' => '',
         'encrypt' => FALSE,
         'compress' => FALSE,
         'stricton' => FALSE,
         'failover' => array(),
         'save_queries' => TRUE
     );
     ```

## Iniciar o Servidor

1. **Iniciar o servidor Apache:**
   - No XAMPP Control Panel, certifique-se de que o Apache está em execução.

2. **Acessar o sistema:**
   - Abra o navegador web e vá para [http://localhost/vendafacilerp](http://localhost/vendafacilerp).

## Acesso ao Sistema

- **Tela de Login:**
  - Acesse o sistema utilizando as credenciais padrão (admin/admin). É recomendado alterar essas credenciais após o primeiro login.

## Contribuições

Contribuições são bem-vindas! Por favor, faça um fork do repositório e envie um pull request com suas melhorias.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo `LICENSE` para mais detalhes.

---

Desenvolvido por Pedro Henrique.
