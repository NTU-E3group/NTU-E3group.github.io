from serpapi import GoogleSearch
import pandas as pd

# Define the number of articles you want to show
article_num = 7

# Get your API key at https://serpapi.com/dashboard
# addd
api_key = "9564b246509b8b5c0be41828e72e1793ddd3dafb1a6c3ba9a4c41114fb0b2c5"

# Define the output file path
output_path = '../src/publication.json'

# Define the columns you want to get
cols = ['title', 'link', 'publication_date', 'journal', 'volume']

# Parameter defines the ID of an author. You can find the ID either by using our Google Scholar Profiles API or by going to the Google Scholar user profile page and getting it from there (e.g., https://scholar.google.com/citations?user={author_id}).
# author_id for Lisa
author_id = "tUbPb-QAAAAJ"

# Function to convert a title to title case
def title_case(title):
    # List of words that should not be capitalized unless they are the first or last word
    small_words = {
        'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 
        'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'with', 'yet'
    }
    
    # Split the title into words
    words = title.split()
    
    # Function to properly capitalize each word
    def capitalize_word(word, is_first_or_last):
        if word.lower() in small_words and not is_first_or_last:
            return word.lower()
        return word.capitalize()
    
    # Apply the capitalize_word function to each word
    capitalized_words = [
        capitalize_word(word, i == 0 or i == len(words) - 1) 
        for i, word in enumerate(words)
    ]
    
    # Join the words back into a single string
    return ' '.join(capitalized_words)

# start
params = {
    "engine": "google_scholar_author",
    "author_id": author_id,
    "api_key": api_key,
    "sort": "pubdate"
  }

articles = GoogleSearch(params).get_dict()['articles'][:article_num]

# Get the citation for each article
df = pd.DataFrame()
for article in articles:
    params = {
        "engine": "google_scholar_author",
        "view_op": "view_citation",
        "citation_id": article['citation_id'],
        "api_key": api_key
    }
    citation = GoogleSearch(params).get_dict()['citation']
    temp = pd.DataFrame(list(citation.items())).set_index(0).T
    df = pd.concat([temp, df])

# Get the columns you want
df = df[cols]
df['title'] = df['title'].apply(title_case)
df['publication_date'] = pd.to_datetime(df['publication_date'], format='mixed')
df['year'] = df['publication_date'].dt.strftime('%y')
df['month'] = df['publication_date'].dt.strftime('%b.')
df.drop('publication_date', axis=1, inplace=True)

# Save the data to a JSON file
df.to_json(output_path, orient='records', force_ascii=False)