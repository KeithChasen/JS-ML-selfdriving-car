    // when t == 0
    // result is A (left)
    // when t == 1 
    // result is B (right)

    // all non 0 or 1 
    // is the point closer to A or B
    function lerp(A, B, t) {
        return A + (B - A) * t;
    }