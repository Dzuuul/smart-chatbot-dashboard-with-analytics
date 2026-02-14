# Gunakan image resmi Postgres versi Alpine yang ringan
FROM postgres:17-alpine

# Set environment variables default untuk database
# Values ini bisa di-override melalui docker-compose atau docker run
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=smart_chatbot_dashboard

# Expose port default Postgres
EXPOSE 5417

# Volume untuk persistensi data (opsional, biasanya diatur di docker-compose)
VOLUME ["/var/lib/postgresql/data"]
