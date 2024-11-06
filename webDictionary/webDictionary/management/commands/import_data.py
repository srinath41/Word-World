# from django.core.management.base import BaseCommand
# from webDictionary.models import Word
# from django import setup
# import json
# import os   


# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "webDictionary.settings")
# setup()
# class Command(BaseCommand):
#     help = 'Import data from a JSON file'

#     def add_arguments(self, parser):
#         parser.add_argument('json_file', type=str, help='Path to the JSON file to import')

#     def handle(self, *args, **kwargs):
#         json_file = kwargs['json_file']
#         with open(json_file, 'r') as file:
#             data = json.load(file)
#             for entry in data:
#                 for word, meaning in entry.items():
#                     Word.objects.create(word=word, meaning=meaning)
#         self.stdout.write(self.style.SUCCESS('Data import complete'))


from django.core.management.base import BaseCommand
from webDictionary.models import Word

class Command(BaseCommand):
    help = 'Add new words and meanings'

    def handle(self, *args, **kwargs):
        words_to_add = {
            "wordworld": "Our website, Word World focuses on delivering crisp and clear definitions, allowing you to explore the meaning of words with ease!.",
        }
        
        for word, meaning in words_to_add.items():
            Word.objects.create(word=word, meaning=meaning)

        self.stdout.write(self.style.SUCCESS('New words added successfully'))
