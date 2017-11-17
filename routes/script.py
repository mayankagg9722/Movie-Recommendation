import numpy as np
import pandas as pd
import sys
import json
l=sys.argv
similar_movie_search=l[1]
column_names = ['user_id', 'item_id', 'rating', 'timestamp']
df = pd.read_csv('u.data',sep='\t', names=column_names)
movie_titles = pd.read_csv("Movie_Id_Titles",sep=',')
df = pd.merge(df,movie_titles,on='item_id')
ratings = pd.DataFrame(df.groupby('title')['rating'].mean())
ratings['num of ratings'] = pd.DataFrame(df.groupby('title')['rating'].count())
moviemat = df.pivot_table(index='user_id',columns='title',values='rating')
starwars_user_ratings = moviemat[similar_movie_search]
similar_to_starwars = moviemat.corrwith(starwars_user_ratings)
corr_starwars = pd.DataFrame(similar_to_starwars,columns=['Correlation'])
corr_starwars = corr_starwars.join(ratings['num of ratings'])
similar_movies=corr_starwars[corr_starwars['num of ratings']>100].sort_values('Correlation',ascending=False)
title=[]
rating=[]
data={}
for row in similar_movies.head().iterrows():
    title.append(str(row[0]))
    rating.append(ratings['rating'][str(row[0])])
data['title']=title
data['rating']=rating

print(json.dumps(data))
