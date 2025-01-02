# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

# Clone the repository
RUN apt-get update && apt-get install -y git && \
    git clone https://github.com/abhi-octobit8/fix-my-tax.git . 

# Restore dependencies
RUN dotnet restore

# Build the application
RUN dotnet publish -c Release -o /app/out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app

# Copy the published files from the build stage
COPY --from=build /app/out .

# Expose the application's port
EXPOSE 80
EXPOSE 443

# Start the application
ENTRYPOINT ["dotnet", "TaxpertRepo.dll"]
