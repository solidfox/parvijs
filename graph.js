// eg. parse tree for S->A, A->B C, B->go/zho C->straight/zau 

// nodes is an array of node elements where each node element is an
// array of incoming edge ids and outgoing edge ids.
var parse = function() {
    'root' : 0,
    'tree' : { 'nodes' : [[[0],[]], [[1],[0]], [[2],[1]], [[3],[1]], [[],[2]], [[],[3]]],
	       'hyperedges' : [[[0],[1]], [[1],[2,3]], [[2],[4]], [[3],[5]]],
	       // a list of node_payload
	       'node_payloads' : ['S', 'A', 'B', 'C', 'go/zho', 'straight/zau'],
	       'edge_payloads' : [false, false, false, false]
	     }
}

var grammar_type = {
    NONTERMINAL : 0,
    TERMINAL : 1,
    STRAIGHT : 0,
    INVERTED : 1,
}

// type is grammar_type.STRAIGHT or grammar_type.INVERTED
var edge_payload = function(type) {
    var __type = type?type:0;
    var type = function(type) {
	if(!type) {
	    return __type;
	} else {
	    __type = type;
	}
    }

    var straight_b = function() {
	return __type == grammar_type.STRAIGHT;
    }

    var inverted_b = function() {
	return __type == grammar_type.INVERTED;
    }
}

// type is grammar_type.NONTERMINAL or grammar_type.TERMINAL
var node_payload = function(label,type) {
    var __label = label?label:'';
    var __type = type?type:0;
    var label = function(label) {
	if(!label) {
	    return __label;
	} else {
	    __label = label;
	}
    }

    var type = function(type) {
	if(!type) {
	    return __type;
	} else {
	    __type = type;
	}
    }

    var nonterminal_b = function() {
	return __type==grammar_type.NONTERMINAL;
    }

    var terminal_b = function() {
	return __type==grammar_type.TERMINAL;
    }
}


var node = function(inc_edges, out_edges) {
    var __inc_edges = inc_edges?inc_edges:[];
    var __out_edges = out_edges?out_edges:[];
    
    var incoming_edges = function(inc_edges) { 
	if(!inc_edges) {
	    return new Array(__inc_edges);
	} else {
	    __inc_edges = inc_edges;
	}
    }

    var outgoing_edges = function(out_edges) { 
	if(!out_edges) {
	    return new Array(__out_edges);
	} else {
	    __out_edges = out_edges;
	}
    }
}

