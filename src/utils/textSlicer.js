const textSlicer = (text = '', limit) => {
    if (text.length > limit) {
        text = text.slice(0, limit).split(' ');
        return text.slice(0, text.length - 1).join(' ') + '...';
    }
    
    return text;
}

export default textSlicer;