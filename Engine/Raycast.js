Raycast = function(origin, vector, collider){

	this.collider = collider;

	this.segment = new Segment(origin, new Vector2(origin.x + vector.x, origin.y + vector.y));

	var colliderBounds = collider.gameObject.bounds;
	this.colliderSegments = [
		new Segment(
			new Vector2(colliderBounds.min.x, colliderBounds.max.y),
			new Vector2(colliderBounds.min.x, colliderBounds.min.y)
		),
		new Segment(
			new Vector2(colliderBounds.min.x, colliderBounds.min.y),
			new Vector2(colliderBounds.max.x, colliderBounds.min.y)
		),
		new Segment(
			new Vector2(colliderBounds.max.x, colliderBounds.min.y),
			new Vector2(colliderBounds.max.x, colliderBounds.max.y)
		),
		new Segment(
			new Vector2(colliderBounds.max.x, colliderBounds.max.y),
			new Vector2(colliderBounds.min.x, colliderBounds.max.y)
		)
	];

	this.hit = null;

	this.doRaycast();

};
Raycast.prototype.doRaycast = function()
{

	for(var i = 0; i < this.colliderSegments.length; i++){
		var colliderSegment = this.colliderSegments[i];

		var segmentsAngle = Math.atan2(colliderSegment.vector.y, colliderSegment.vector.x) - Math.atan2(this.segment.vector.y, this.segment.vector.x);

		if(segmentsAngle % Math.PI / 2 == 0){
			continue;
		}

		if(segmentsAngle < 0){
			segmentsAngle += 2 * Math.PI;
		}

		if(segmentsAngle == Math.PI / 2){
			continue;
		}

		var denom = this.segment.vector.x * colliderSegment.vector.y - this.segment.vector.y * colliderSegment.vector.x;

		if(denom == 0){
			continue;
		}

		var raycastHitDistancePercent = - (this.segment.origin.x * colliderSegment.vector.y - colliderSegment.origin.x * colliderSegment.vector.y - colliderSegment.vector.x * this.segment.origin.y + colliderSegment.vector.x * colliderSegment.origin.y) / denom;

		if(raycastHitDistancePercent < 0 || raycastHitDistancePercent > 1){
			continue;
		}

		var colliderSegmentHitDistancePercent = - (-this.segment.vector.x * this.segment.origin.y + this.segment.vector.x * colliderSegment.origin.y + this.segment.vector.y * this.segment.origin.x - this.segment.vector.y * colliderSegment.origin.x) / denom;

		if(colliderSegmentHitDistancePercent < 0 || colliderSegmentHitDistancePercent > 1){
			continue;
		}

		this.hit = {
			vector: new Vector2(this.segment.vector.x * raycastHitDistancePercent, this.segment.vector.y * raycastHitDistancePercent),
			colliderSegment: colliderSegment,
			colliderSegmentIndex: i,
			raycastHitDistancePercent: raycastHitDistancePercent,
			colliderSegmentHitDistancePercent: colliderSegmentHitDistancePercent,
			segmentsAngle: segmentsAngle * 180 / Math.PI
		};
		break;

	}

};