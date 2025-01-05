from flask import Blueprint, request, jsonify
from extensions import db, mail
from models import Order
from flask_mail import Message

orders_bp = Blueprint("orders", __name__, url_prefix="/orders")

@orders_bp.route("/", methods=["GET"])
def get_orders():
    """Получить список всех заказов."""
    orders = Order.query.all()
    data = []
    for order in orders:
        data.append({
            "id": order.id,
            "customer_name": order.customer_name,
            "customer_email": order.customer_email,
            "product_name": order.product_name,
            "created_at": order.created_at.isoformat(),
            "status": order.status
        })
    return jsonify(data), 200

@orders_bp.route("/", methods=["POST"])
def create_order():
    """Создать новый заказ."""
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    try:
        new_order = Order(
            customer_name=data["customer_name"],
            customer_email=data["customer_email"],
            product_name=data["product_name"],
        )
        db.session.add(new_order)
        db.session.commit()

        # Отправка письма клиенту (пример)
        msg = Message(
            subject="Ваш заказ оформлен!",
            recipients=[new_order.customer_email],
            body=f"Здравствуйте, {new_order.customer_name}. Ваш заказ успешно создан!"
        )
        mail.send(msg)

        return jsonify({"message": "Order created", "order_id": new_order.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@orders_bp.route("/<int:order_id>", methods=["GET"])
def get_order_by_id(order_id):
    """Получить заказ по ID."""
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    return jsonify({
        "id": order.id,
        "customer_name": order.customer_name,
        "customer_email": order.customer_email,
        "product_name": order.product_name,
        "created_at": order.created_at.isoformat(),
        "status": order.status
    }), 200

@orders_bp.route("/<int:order_id>", methods=["PUT"])
def update_order(order_id):
    """Обновить заказ (например, изменить статус)."""
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404

    data = request.get_json()
    if "status" in data:
        order.status = data["status"]

    db.session.commit()
    return jsonify({"message": "Order updated"}), 200

@orders_bp.route("/<int:order_id>", methods=["DELETE"])
def delete_order(order_id):
    """Удалить заказ."""
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404

    db.session.delete(order)
    db.session.commit()
    return jsonify({"message": "Order deleted"}), 200
