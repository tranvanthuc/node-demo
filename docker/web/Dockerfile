# base image
FROM node:17-alpine3.14

# add group and user
RUN addgroup app && adduser -S -G app app
USER app

# work on app 
WORKDIR /app

# copy with user app
ADD --chown=app:app package*.json ./
RUN npm install

# copy all source code
COPY --chown=app:app . .

# environment
ENV PORT=5000

EXPOSE 5000
