{% set outputUrl = 'https://' + pkg.projectDomain + page.url %}
{% if webmentions %}
{% set filteredMentions = webmentions | webmentionsByUrl(outputUrl) %}
{% endif %}
{% if filteredMentions %}
{% set likes = filteredMentions | getLikes %}
{% set replies = filteredMentions | getReplies %}
{% endif %}

{% if webmentions|length %}

<section>
<h2>Webmentions</h2>
{% if likes|length %}
<section>
<h3>Liked by:</h3>
{% for like in likes %}
<a href="{{ like.author.url }}">
<span>{{ like.author.name }}</span>
<img src="{{ like.author.photo }}" alt="{{ like.author.name }}" style="border-radius: 50%" width="50" height="50"  />
</a>
{% endfor %}
</section>
{% else %}  
 <p>No likes</p>
{% endif %}

        {% if replies|length %}
            <section>
                <h3>Replies:</h3>
                {% for reply in replies %}
                <article>
                    <header>
                        <img src="{{ reply.author.photo}}" />
                        <h1>{{ reply.author.name }}</h1>
                        <a href="{{ reply.author.url }}">Go to profile</a>
                    </header>
                    <div>{{ reply.content.html | safe }}</div>
                    <a href="{{ reply.url }}">Go to reply</a>
                </article>
                {% endfor %}
            </section>
        {% else %}
            <p>No replies</p>
        {% endif %}
    </section>

{% else %}

<p>No Web mentions</p>
{% endif %}
