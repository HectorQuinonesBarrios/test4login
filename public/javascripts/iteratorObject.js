var iterator = (function() {
    var data = { name: 'Hector', apellido: 'Quiñones', edad: '21' },
        keys = Object.keys(data),
        index = 0,
        length = keys.length;
    return {
        next: function() {
            var element;
            if (!this.hasNext()) {
                return null;
            }
            element = data[keys[index]];
            index++;
            return element;
        },
        hasNext: function() {
            return index < length;
        },
        rewind: function() {
            index = 0;
            return data[keys[index]];
        },
        current: function() {
            return data[keys[index]];
        }
    }
}());
while(iterator.hasNext()) {
$('#test').append("<li>" + iterator.current()+"</li>");  
iterator.next();
}

iterator.rewind();
console.log(iterator.current());
