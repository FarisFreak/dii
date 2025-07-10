## Teknologi yang Digunakan

- **Backend**: Node.js (Express.js)
- **Database**: PostgreSQL
- **Authentication**: JWT
- **ORM**: Sequelize
- **Dokumentasi API**: Swagger

---

## Desain ERD (Entity Relationship Diagram)

Full ERD bisa akses [disini](https://dbdiagram.io/d/DII-6603d04cae072629ce11463e)
<!-- > ERD direkomendasikan untuk dibuat di [draw.io](https://draw.io).  
Berikut adalah entitas utama:
- `Users`
- `Roles`
- `UserRoles`
- `Menus`
- `RoleAccess`


(Upload ERD ke repo Anda atau simpan dalam folder `docs/ERD.png`) -->

## Cara Menjalankan Project

```bash
git clone https://github.com/FarisFreak/dii.git
cd dii
npm install
npx sequelize db:migrate
npm run build
npm run start
```