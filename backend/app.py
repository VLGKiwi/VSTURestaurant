from flask import Flask
from config import Config
from extensions import db, migrate, mail, cors
from routes.orders import orders_bp
from admin import create_admin

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Инициализация расширений
    db.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)
    cors.init_app(app, resources={r"/*": {"origins": "*"}})  # Разрешаем CORS

    # Регистрация Blueprint
    app.register_blueprint(orders_bp)

    # Создаем админку Flask-Admin (если нужно)
    create_admin(app)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)  # или любой другой порт
