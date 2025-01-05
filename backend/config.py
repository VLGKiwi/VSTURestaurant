import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class Config:
    # Ключ приложения (для сессий, защиты форм и т.д.)
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")

    # Настройка SQLAlchemy (пусть будет SQLite, т.к. вы говорили, что БД у вас нет)
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'orders.db')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Настройки для отправки почты через Flask-Mail (пример через Gmail)
    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv("MAIL_USERNAME", "example@gmail.com")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD", "password")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER", "example@gmail.com")

