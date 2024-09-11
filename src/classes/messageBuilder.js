const { formatColor } = require('../utils');

module.exports = class MessageBuilder {
    constructor(){
        this.payload = {
            embeds: [{fields: []}]
        };
    };

    getJSON(){
        return this.payload;
    };

    setText(text){
        this.payload.content = text;

        return this;
    }

    setAuthor(author, authorImage, authorUrl){
        const MAX_LENGTH = 256;
        if (author.length > MAX_LENGTH) {
            console.warn(`Author is too long. It has been truncated to ${MAX_LENGTH} characters.`);
            author = author.substring(0, MAX_LENGTH);
        }
        this.payload.embeds[0].author = {};
        this.payload.embeds[0].author.name = author;
        this.payload.embeds[0].author.url = authorUrl;   
        this.payload.embeds[0].author.icon_url = authorImage;  
         
        return this;
    };

    setTitle(title){
        const MAX_LENGTH = 256;
        if (title.length > MAX_LENGTH) {
            console.warn(`Title is too long. It has been truncated to ${MAX_LENGTH} characters.`);
            title = title.substring(0, MAX_LENGTH);
        }
        this.payload.embeds[0].title = title;

        return this;
    };

    setURL(url){
        this.payload.embeds[0].url = url;

        return this;
    };

    setThumbnail(thumbnail){
        this.payload.embeds[0].thumbnail = {};
        this.payload.embeds[0].thumbnail.url = thumbnail;

        return this;
    };

    setImage(image){
        this.payload.embeds[0].image = {};
        this.payload.embeds[0].image.url = image;

        return this;
    };

    setTimestamp(date){
        if (date){
            this.payload.embeds[0].timestamp = date;
        }
        else {
            this.payload.embeds[0].timestamp = new Date();
        };

        return this;
    };

    setColor(color){
        this.payload.embeds[0].color = formatColor(color);

        return this;
    };

    setDescription(description){
        const MAX_LENGTH = 4096;
        if (description.length > MAX_LENGTH) {
            console.warn(`Description is too long. It has been truncated to ${MAX_LENGTH} characters.`);
            description = description.substring(0, MAX_LENGTH);
        }
        this.payload.embeds[0].description = description;

        return this;
    };

    addField(fieldName, fieldValue, inline){
        if (this.payload.embeds[0].fields.length >= 25){
            console.warn('Fields limit reached. Ignoring field.');
            return this;
        }
        const MAX_LENGTH_NAME = 256;
        if (fieldName.length > MAX_LENGTH_NAME) {
            console.warn(`Field name is too long. It has been truncated to ${MAX_LENGTH_NAME} characters.`);
            fieldName = fieldName.substring(0, MAX_LENGTH_NAME);
        }
        const MAX_LENGTH_VALUE = 1024;
        if (fieldValue.length > MAX_LENGTH_VALUE) {
            console.warn(`Field value is too long. It has been truncated to ${MAX_LENGTH_VALUE} characters.`);
            fieldValue = fieldValue.substring(0, MAX_LENGTH_VALUE);
        }
        this.payload.embeds[0].fields.push({
            name: fieldName,
            value: fieldValue,
            inline: inline
        });

        return this;
    };

    setFooter(footer, footerImage){
        const MAX_LENGTH = 2048;
        if (footer.length > MAX_LENGTH) {
            console.warn(`Footer is too long. It has been truncated to ${MAX_LENGTH} characters.`);
            footer = footer.substring(0, MAX_LENGTH);
        }
        this.payload.embeds[0].footer = {};
        this.payload.embeds[0].footer.icon_url = footerImage;
        this.payload.embeds[0].footer.text = footer;

        return this;
    };
};