<h1>User Home Page</h1>

Role - {{Auth::user()->role}}

<form action="{{route('logout')}}" method="POST">
    @csrf
    <input type="submit" value="logout">
</form>