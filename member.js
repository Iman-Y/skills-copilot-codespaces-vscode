function skillsMember()
{
    var member = document.getElementById("member").value;
    var memberError = document.getElementById("memberError");
    if (member == "")
    {
        memberError.innerHTML = "Please enter your name";
        memberError.style.color = "red";
        return false;
    }
    else
    {
        memberError.innerHTML = "";
        return true;
    }
}