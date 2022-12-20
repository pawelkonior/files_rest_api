from django.db import models


class Order(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Files(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='files')
    file = models.FileField(upload_to='files/')
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
