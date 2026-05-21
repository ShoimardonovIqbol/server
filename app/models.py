from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Модели корбар (User)
    pass

class Message(models.Model):
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="sent_messages",
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="received_messages",
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    @staticmethod
    def build_room_name(first_user_id, second_user_id):
        # Барои ду корбар як номи утоқи ягона месозад (масалан: chat-1-2)
        first_id, second_id = sorted([int(first_user_id), int(second_user_id)])
        return f"chat-{first_id}-{second_id}"

    def __str__(self):
        return f"{self.sender.username} -> {self.receiver.username}: {self.content[:30]}"
