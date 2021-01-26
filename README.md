# RASM

Live in the maths universe. Express your thought, draw your imaginations! 💖

# Run

```js
❯ npm i
❯ npm start
```

---------------

# Backend

We will have, insha'Allah:

- Authentication system using just APIs, request and response.
- Backend databases to store rasmat.

## Models

### Rasma

- `user_id: integer` -> a user may have many rasmat.
- `title: string`
- `description: string`
- `version: number`
- `creation_date: Date`
- `last_modified_at: date`
- `data: JSON`
- `tags: string`, e.g., `'tag1,tag2,tag3'`
- `thumbnail: Image`, the server will response with a url to the image, which will be stored at the basck end, we may generate it at the backend with the javascript code used in the front end, may by using `selenium-webdriver`

### RasmaEdition

- `rasma_id: integer` -> a rakam may have multiple edition, we have to store at maximum 5 edition only or another number, removing the oldest one when you recieve te sixth edition.
- `version: number`
- `data: JSON`
- `creation_date: Date`
