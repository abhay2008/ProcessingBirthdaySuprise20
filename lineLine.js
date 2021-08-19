function lineIntersectsLine(x1, y1, x2, y2, x3, y3, x4, y4, intersection, endpoints1, endpoints2) {
  const den  = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4);
  const num1 = (x1-x3)*(y3-y4) - (y1-y3)*(x3-x4);
  const num2 = (x2-x1)*(y1-y3) - (y2-y1)*(x1-x3);
  const t = num1 / den;
  const u = num2 / den;
  let isIntersection = true;
  if (endpoints1 >= 1) isIntersection = isIntersection && t >= 0;
  if (endpoints1 >= 2) isIntersection = isIntersection && t < 1;
  if (endpoints2 >= 1) isIntersection = isIntersection && u >= 0;
  if (endpoints2 >= 2) isIntersection = isIntersection && u < 1;
  if (intersection) {
    if (!isIntersection) return null;
    return createVector(lerp(x1, x2, t), lerp(y1, y2, t));
  } else {
    return isIntersection;
  }
}