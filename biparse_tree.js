// Bisegment: {l1:input_language, l0:output_language}

function node_t(label, inverted, bisegment){
	this.label_m = label;
	this.bisegment_m = bisegment;
	if (!inverted) {
		this.inverted_m = false;
	} else {
		this.inverted_m = true;
	}
}

node_t.prototype.parent = function(parent) {
	if (parent) {
		this.parent_m = parent;
	} else {
		return this.parent_m;
	}
};

node_t.prototype.children = function(children) {
	if (children) {
		this.children_m = children;
	} else {
		return this.children_m;
	}
};

node_t.prototype.label = function(label) {
	if (label) {
		this.label_m = label;
	} else {
		return this.label_m;
	}
};

node_t.prototype.inverted = function(inverted) {
	if (inverted !== undefined) {
		this.inverted_m = inverted;
	} else {
		return this.inverted_m;
	}
};

node_t.prototype.bisegment = function(bisegment) {
	if (bisegment) {
		this.bisegment_m = bisegment;
	} else {
		return this.bisegment_m;
	}
};

node_t.prototype.is_leaf = function() {
	return bisegment !== undefined;
};

