# Logfile TopTen

This function is designed to take in an Apache style log file and return the top ten IP addresses.

It stores the IP addresses in the LogDict.keyCounts object as the key and increments the count each time it is found.

After each iteration, it passes the IP and Count as an object into the TopTen.add() method. TopTen.data is a ten item array of objects.
This does the following:

* If the new IP count is lower than the lowest in the 10 element array, it returns early.
* Use map to return the indexOf the IP address.
* If there is a match, the count is updated.
* If the data array has less than 10 entries and it didn't match, we add it.
* Then sort the array, greatest first.

While there is a lot of work going on, it is all being done on a ten item array that does not grow.
