FROM mysql:8.0.23 as builder

RUN ["sed", "-i", "s/exec \"$@\"/echo \"not running $@\"/", "/usr/local/bin/docker-entrypoint.sh"]

COPY ./docker/mysql/posts.sql /docker-entrypoint-initdb.d

ENV MYSQL_ROOT_PASSWORD=password

RUN ["/usr/local/bin/docker-entrypoint.sh", "mysqld", "--datadir", "/initialized-db"]

FROM mysql:8.0.23

COPY --from=builder /initialized-db /var/lib/mysql
