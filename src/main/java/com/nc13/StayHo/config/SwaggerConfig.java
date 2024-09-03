package com.nc13.StayHo.config;


@OpenAPIDefinition(
        info = @Info(
                title = "Hotel API",
                description = "hotel project의 api 문서입니다.",
                version = "v1"
        )
)
@Configuration
public class SwaggerConfig {
    private static final String BEARER_TOKEN_PREFIX = "Bearer";

    @Bean
    public OpenAPI openAPI() {
        String securityJwtName = "JWT";
        SecurityRequirement securityRequirement = new SecurityRequirement().addList(securityJwtName);
        Components components = new Components().addSecuritySchemes(securityJwtName,
                new SecurityScheme().name(securityJwtName)
                        .type(SecurityScheme.Type.HTTP)
                        .scheme(BEARER_TOKEN_PREFIX)
                        .bearerFormat(securityJwtName)
        );
        return new OpenAPI()
                .addSecurityItem(securityRequirement)
                .components(components);
    }
}
