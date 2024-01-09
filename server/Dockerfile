# Use the official Python image as the base image
FROM python:3.8

COPY . /app

# Set the working directory to /app
WORKDIR /app

# Install any dependencies specified in requirements.txt
RUN pip install -r requirements.txt

EXPOSE 8080

# Define the command to run the Flask app
CMD ["python", "app.py"]
