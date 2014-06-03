Please feel free to ask us questions.

**Download this gist and include the files to the repo. Create a README.md file with simple instructions to run it.**

The focus of this assignment is on the **back end** (or **server side**) but will also test your ability to create a small recommendation system. We will be looking specifically for good practices and your development process.

You are not supposed to solve this problem with the tools you have most skill at, rather it is recommended to use `<OPTION 1>` or alternatively `<OPTION 2>`.

Also, **don't use any DB** for this assignment, all data should be kept in memory and disposed when the server stops - no worries about persistence.

## Fictional MVP!

This fictional client has asked for a recommendation system for their social music player system.
They want you to take note of what music the user has listened to, which people they follow, and from there, recommend some songs. There is no like or dislike so far.

In this system there are few "elements"; 

- **music**: have an ID and a list of tags (see `music.json`)
- **users**: have an ID, follow N other users, have heard Y musics in the past. 

How to model or index this data is up to you.

### There should be 3 end points

##### `POST /follow`
Add one follow relationship (see `follows.json`)

the request body has 2 params:
- from: \<user ID\>
- to: \<user ID\>

##### `POST /listen`
Add one song that the user has just listened to ( see `listen.json` )

the request body has 2 params:
- user: \<user ID\>
- music: \<music ID\>

##### `GET /recommendations`
Return 5 music recommendations to this user, they should be sorted by relevance

Query string has:
- user: \<user ID\>

response looks like:

```json
{
  "list": ["<music ID>", "<music ID>", "<music ID>", "<music ID>", "<music ID>"]
}
```

--

It's supposed to be a simplistic recommendation engine, which takes into account these main components:
- based on what music they have heard before
- people who the user follow in first degree, and maybe even followees of followees
- maximize for discovery of new songs

#### Make it run!

We expect 2 parts:

1. a server that only has business logic (the endpoints) with the DB, it should load `musics.json` upon server start, but other files will be loaded by:
2. a series of commands that load the data through your endpoints and finally get a recommendation (see `script.md`)

Finally, make any type of runner that starts your server and runs the script. Whether the server will be running or not after the results finish is up to you. It's also ok to have one command to put the server up running and another to run script.

#### Hints
- there isn't one right answer, but the modeling skills matters
- don't worry about finding a perfect solution to this, it's an MVP
- implement the script correctly
- make simple instructions to execute the server and the script

Before you start or shoot us questions (don't hesitate ;) please read and fill `QnA.md`