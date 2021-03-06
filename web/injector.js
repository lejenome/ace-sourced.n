
window.haschange = undefined;

function acedebsources_inject() {
    // load the additional scripts:

    var base = 'https://people.debian.org/~geissert/ace-debsources/';

    var insertjs = document.createElement('script');
    insertjs.type = 'text/javascript';
    // needed, as ace won't know where to download its stuff from
    insertjs.attributes['data-ace-base'] = 'https://cdn.jsdelivr.net/ace/1.1.8/min/';
    insertjs.async = false;
    insertjs.src = insertjs.attributes['data-ace-base'] + 'ace.js';
    document.body.appendChild(insertjs);

    [
	'/diff.js',
	'/editor.js'
    ].forEach(function(js) {
	    insertjs = document.createElement('script');
	    insertjs.type = 'text/javascript';
	    insertjs.async = false;
	    insertjs.src = base+js;
	    document.body.appendChild(insertjs);
	}
    );

    // only actually inject if the page is actually for a file
    var mtable = document.getElementById('file_metadata');
    if (mtable == null)
	return;

    var a_elems = mtable.getElementsByTagName('a');

    var editlink, separator, parentfolderlink;

    for (var i = 0; i < a_elems.length; i++) {
	if (a_elems[i].textContent == 'parent folder') {
	    parentfolderlink = a_elems[i];

	    separator = document.createElement('span');
	    separator.textContent = ' | ';
	    parentfolderlink.parentElement.insertBefore(separator, parentfolderlink.nextElementSibling);

	    editlink = document.createElement('a');
	    editlink.textContent = 'edit';
	    editlink.id = 'editcode_trigger';
	    editlink.href = 'javascript:editcode();';
	    editlink.onclick = function() {
		    editcode();
	    };
	    parentfolderlink.parentElement.insertBefore(editlink, parentfolderlink.nextElementSibling);
	}
    }
}

acedebsources_inject();
