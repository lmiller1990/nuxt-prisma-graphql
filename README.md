## TODO

- model entities
  - add tables to database
- set up prisma
  - write some tests with prisma
- add graphql
  - test endpoints, queries, mutations
- add nuxt
- add auth
- add main link site (generated?)
- make admin area
- add payments 
- deploy


## Models

user
  - username
  - password
  - email
  - verified
  - pro

user_themes
  - user_id
  - theme_id

theme
  - name
  - pro_only
  - designer_id (points to user)
  - price
  - background_css

button
  - theme_id
  - primary_color
  - secondary_color

link
  - user_id
  - text
  - url
  - icon?