from django.shortcuts import render
from django.http import JsonResponse
from .models import Word

def home(request):
    return render(request, 'homeSearch.html')


def truncate_meaning(meaning):
    
    return meaning.split('.')[0]+meaning.split('.')[1] if '.' in meaning else meaning

def search_word(request):
    search_query = request.GET.get('q', '').lower()
    try:
        # Retrieve the word object from the database
        word = Word.objects.get(word=search_query)
        # Truncate the meaning to a single sentence
        result = truncate_meaning(word.meaning)
    except Word.DoesNotExist:
        result = "Word not found."

    return JsonResponse({'result': result})
