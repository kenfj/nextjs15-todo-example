# Use the official PostgreSQL image
FROM postgres:latest

# Set environment variables for PostgreSQL user, password, and database
ENV POSTGRES_USER=devuser
ENV POSTGRES_PASSWORD=devpassword
ENV POSTGRES_DB=devdb
