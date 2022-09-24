#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/PostalBag.Web.Host/PostalBag.Web.Host.csproj", "src/PostalBag.Web.Host/"]
COPY ["src/PostalBag.Web.Core/PostalBag.Web.Core.csproj", "src/PostalBag.Web.Core/"]
COPY ["src/PostalBag.Application/PostalBag.Application.csproj", "src/PostalBag.Application/"]
COPY ["src/PostalBag.Core/PostalBag.Core.csproj", "src/PostalBag.Core/"]
COPY ["src/PostalBag.EntityFrameworkCore/PostalBag.EntityFrameworkCore.csproj", "src/PostalBag.EntityFrameworkCore/"]
RUN dotnet restore "src/PostalBag.Web.Host/PostalBag.Web.Host.csproj"
COPY . .
WORKDIR "/src/src/PostalBag.Web.Host"
RUN dotnet build "PostalBag.Web.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PostalBag.Web.Host.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PostalBag.Web.Host.dll"]