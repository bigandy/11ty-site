{% set outputUrl = 'https://' + pkg.projectDomain + page.url %}
{% if webmentions %}
{% set filteredMentions = webmentions | webmentionsByUrl(outputUrl) %}
{% endif %}
{% if filteredMentions %}
{% set likes = filteredMentions | getLikes %}
{% set replies = filteredMentions | getReplies %}
{% endif %}

{% if webmentions %}

<section>
    <h2>Webmentions</h2>
    {% if likes %}
    <section>
        <h3>Liked by:</h3>
        {% for like in likes %}
        <a href="{{ like.author.url }}">
            <img src="{{ like.author.photo }}" alt="{{ like.author.name }}" />
        </a>
        {% endfor %}
    </section>
    {% endif %}
    {% if replies %}
    <section>
        <h3>Replies:</h3>
        {% for reply in replies %}
        <article>
            <header>
                <img src="{{ reply.author.photo}}" />
                <h1>{{ reply.author.name }}</h1>
                <a href="{{ reply.author.url }}">Go to profile</a>
            </header>
            <div>{{ reply.content.html }}</div>
            <a href="{{ reply.url }}">Go to reply</a>
        </article>
        {% endfor %}
    </section>
    {% endif %}
</section>
{% else %}
<p>No Web mentions</p>
   {% endif %}
