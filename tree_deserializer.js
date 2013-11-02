

function deserialize_tree(serialized_tree) {
	var bracket_stack = [];
	var node_stack = [];

	var ws_re = /\s/;
	var bisegment_re = /^/g;
	var label_re = /^(\w*)\s*("([^"]|\\")*"\s*\/\s*"([^"]|\\")*")?/g;

	for (var i = 0; i < serialized_tree.length; i++) {
		var token = serialized_tree[i];
		if (token.test(ws_re)) {continue;}

		switch (token) {
			case '<':
			case '[':
			bracket_stack.push(token);
			break;
			case '>':
			if (bracket_stack.pop() != '<') {
				throw "Syntax error";
			}
			// TODO pop the node_stack into the children of the tail
			break;
			case ']':
			if (bracket_stack.pop() != '[') {
				throw "Syntax error";
			}
			// TODO pop the node_stack into the children of the tail
			break;
			default:
			label_re.lastIndex = i;
			bisegment_re.lastIndex = i;
			var label_match = serialized_tree.match(label_re);
			var bisegment_match = serialized_tree.match(bisegment_re);
			if (label_match) {
				var label = label_match[0];
				var inverted = bracket_stack[bracket_stack.length-1] === "<";
				i = label_re.lastIndex - 1;
				var node = new Node(label, inverted);
				node_stack.push(node);
			} else {

				if (label_match) {
					var label = label_match[0];
					var inverted = bracket_stack[bracket_stack.length-1] === "<";
					i = bisegment_re.lastIndex - 1;
					var node = new Node(label, inverted);
					node_stack.push(node);
				}
			}
		}
	}
}

