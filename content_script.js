var u = new SpeechSynthesisUtterance();
u.lang = 'en-US';
u.rate = 1.2;

/*
document.body.onmouseup = ()=>{
        speakList(getSimilarToSelected());
}
*/

function speakList(list){
    console.log(u)
    var index = 0;

    u.onend = (event)=>{
        if(++index<list.length)
            speak_text(list[index])
    }
    var speak_text = (text)=>{
        u.text = text;
        speechSynthesis.speak(u);
    }

    speak_text(list[0])

}

function speak_text(text){
    u.text = text;
    speechSynthesis.speak(u);
}


function getSelectedNode()
{
    if (document.selection)
        return document.selection.createRange().parentElement();
    else
    {
        var selection = window.getSelection();
        if (selection.rangeCount > 0)
            return selection.getRangeAt(0).startContainer.parentNode;
    }
}

function getParentAndClassList(node){
    var list = [];
    var classList = [node.classList];
    var parentList = [node.tagName];
    
    var currentNode = node;

    while (currentNode.parentElement.tagName != "BODY")
    {
        currentNode = currentNode.parentElement;
        parentList.push(currentNode.tagName)
        classList.push(currentNode.classList)
    } 

    list.push(parentList)
    list.push(classList)
    return list;
}

function ancestorListToNodes(list){

    var children = null;
    var currentNode = document.body;

    var recurseSearch = (node,i)=>{
        if (i == -1)
            return [node.innerText];        
        
        var result = [];
        if (node.children)

        for (var c=0;c<node.children.length;c++){

            if (/*node.children[c].classList == list[1][i]
                && */node.children[c].tagName == list[0][i])
                {
                   var returnVal = recurseSearch(node.children[c],i-1) 

                   if (returnVal.length)
                    result.push(...returnVal);
                }     
        }
        return result;

    }

    return recurseSearch(currentNode,list[0].length-1);
}

function getSimilarToSelected(){
    var node = getSelectedNode()
    var parent_list = getParentAndClassList(node);
    var result = ancestorListToNodes(parent_list)
    console.log(result)

    return result
}