function deserialize_tree(serialized_tree) {
	var bracket_stack = [];
	var node_stack = [];

	var current_node;

	var node_re = /(?:^\s*(<|\[)\s*(\w*)(?:\s+"((?:[^"]|\\")*)"\/"((?:[^"]|\\")*)")?)|(?:^\s*(>|\])\s*)/g;

	while (true) {
		var match = node_re.exec(serialized_tree);
		serialized_tree = serialized_tree.substr(node_re.lastIndex);
		node_re.lastIndex = 0;

		if (!match) {
			console.log(current_node);
			throw "Could not recognize: " + serialized_tree;
		}

		var leading_bracket = match[1];
		var ending_bracket = match[5];
		
		if (ending_bracket) {
			// There was an ending bracket!
			var reached_end_of_input = node_re.lastIndex == serialized_tree.length;
			if (ending_bracket === ">" && current_node.inverted() ||
				ending_bracket === "]" && !current_node.inverted()) {
				// Completed node
				if (!current_node.parent()) {
					if (reached_end_of_input) {
						return current_node;
					} else {
						throw "Completed tree before reaching end of input: " + serialized_tree.substr(node_end_re.lastIndex);
					}
				} else {
					current_node = current_node.parent();
				}
			} else {
				throw "Missmatching bracket: " + ending_bracket;
			}
		} else if (leading_bracket) {
			// There was a leading bracket! Good.
			var inverted = match[1] === '<';
			var label = match[2];
			var bisegment;
			if (match[3]) {
				bisegment = {l1:match[3], l0:match[4]};
			}
			var new_node = new node_t(label, inverted, bisegment);
			if (current_node) {
				// Associate parent and child
				current_node.add_child(new_node);
				new_node.parent(current_node);
			}
			current_node = new_node;
		}
	}
}

