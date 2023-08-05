FROM node:18.17.0-alpine3.18
# RUN addgroup dockeruser && adduser -S -G dockeruser dockeruser
# USER dockeruser
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm" , "start"]

# RUN addgroup dockeruser && adduser -S -G dockeruser dockeruser
# USER dockeruser