/**
 * Returns a list of the subtree starting at start node.
 */

function english_order (start_node, list) {
	if (list === undefined) {
		list = [];
	}
	if (!start_node.is_leaf()) {
		list.push(start_node);
	} else {
		if (start_node.incomming().length > 1) {
			throw "Multiple incomming hyperedges not allowed for ITGs. On node: " + start_node.toString();
		}
		var in_edge = start_node.incomming()[0];
		var children = in_edge.tail();
		for (var i = 0; i < children.length; i++) {
			var child = children[i]
			english_order(child,list);
		}  
	}
}