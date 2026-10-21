import type { Language, Snippet, Tag } from "../models/snippet.types";

export const localLanguages: Language[] = [
    {
        "id": 1,
        "name": "JavaScript"
    },
    {
        "id": 2,
        "name": "TypeScript"
    },
    {
        "id": 3,
        "name": "Python"
    },
    {
        "id": 4,
        "name": "Java"
    },
    {
        "id": 5,
        "name": "C#"
    },
    {
        "id": 6,
        "name": "Ruby"
    },
    {
        "id": 7,
        "name": "GO"
    },
    {
        "id": 8,
        "name": "Rust"
    },
    {
        "id": 9,
        "name": "PHP"
    },
    {
        "id": 10,
        "name": "SQL"
    },
    {
        "id": 11,
        "name": "HTML"
    },
    {
        "id": 12,
        "name": "CSS"
    },
]

export const localTags: Tag[] = [
    {
        "id": 1,
        "name": "Spring Boot"
    },
    {
        "id": 2,
        "name": "REST API"
    },
    {
        "id": 3,
        "name": "Java"
    },
    {
        "id": 4,
        "name": "JavaScript"
    },
    {
        "id": 5,
        "name": "JDBC"
    },
    {
        "id": 6,
        "name": "MySQL"
    },
    {
        "id": 7,
        "name": "DataBase"
    }
]

export const localSnippets: Snippet[] = [
        {
            "id": 1,
            "title": "MySql JDBC Route",
            "code": "jdbc:mysql://\u003Cip direction\u003E:\u003Cport\u003E/\u003Cdatabase name\u003E",
            "language": {
                "id": 4,
                "name": "Java"
            },
            "createdAt": "2026-09-07T14:17:05",
            "updatedAt": "2026-09-07T14:17:05",
            "tags": []
        },
        {
            "id": 2,
            "title": "Print Console",
            "code": "print(\"My name is Victor\")",
            "language": {
                "id": 3,
                "name": "Python"
            },
            "createdAt": "2026-09-07T14:26:45",
            "updatedAt": "2026-09-07T14:26:45",
            "tags": []
        },
        {
            "id": 3,
            "title": "MySQL Connection",
            "code": "spring.datasource.url=jdbc:mysql://\u003Cip\u003E:\u003Cport\u003E/\u003Cdatabase name\u003E\nspring.datasource.username=\u003Cusername\u003E\nspring.datasource.password=\u003Cpassword\u003E\n\nspring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect\nspring.jpa.hibernate.ddl-auto=update",
            "language": {
                "id": 4,
                "name": "Java"
            },
            "createdAt": "2026-09-07T14:21:32",
            "updatedAt": "2026-09-07T16:23:14",
            "tags": [
                {
                    "id": 1,
                    "name": "Spring Boot"
                },
                {
                    "id": 2,
                    "name": "REST API"
                }
            ]
        },
        {
            "id": 4,
            "title": "MySQL Connection",
            "code": "\na\na\na\na\na\na\na\na\na\naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "language": {
                "id": 4,
                "name": "Java"
            },
            "createdAt": "2026-09-07T14:21:32",
            "updatedAt": "2026-09-07T16:23:14",
            "tags": [
                {
                    "id": 1,
                    "name": "Spring Boot"
                },
                {
                    "id": 2,
                    "name": "REST API"
                },
                {
                    "id": 3,
                    "name": "Java"
                },
                {
                    "id": 4,
                    "name": "JavaScript"
                },
                {
                    "id": 5,
                    "name": "JDBC"
                },
                {
                    "id": 6,
                    "name": "MySQL"
                },
                {
                    "id": 7,
                    "name": "DataBase"
                }
            ]
        }
    ]