# Use an official Nginx image as the base image
FROM nginx

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the Nginx configuration to the container
COPY nginx.conf /etc/nginx/conf.d/