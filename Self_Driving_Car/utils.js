function lerp(A,B,t)
{
    // when (B-A)* t = 0; when t is 1, -A will cancel out, and left with b.
    // It gives the two endpoints
    return A+(B-A)*t;
}