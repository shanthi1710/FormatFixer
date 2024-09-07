This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
 ```

## Approaches to Making Steps Persistent
This means that if a user is working through different steps in your app (e.g., uploading a file, checking for errors, reviewing data), and they close the app or refresh the page, they should be able to continue from where they left off.

1. Design a database to track the users activity on the application
You must have a method of identifying what stage any of the users are in. In order to achieve this, one has to create a specific table in the database. This table will store:
User ID: In order to differentiate between every single user present in the world.
Current Step: To define which phase of the given work the user is at (uploading, viewing, submitting).
Data Related to the Steps: Keep other information for every step, for example: the data about the file after the uploading, the data parsed, the errors detected and so on.
Timestamps: Document the time it was made and updated in order to keep track for audit and reloading.

3. Please update the database after every step.
At the end of every step the application you have to store the user at which step he is and store any data that belongs to this step (file upload, parsing and checking errors).
After File Upload (Step 1): Upon the uploading of a file by the user, store information on the said file in the database such information as the name of the file, size of the file as well as format of the file. Label this current step as “Step 1”. It also means that if user leaves the app you know they have just uploaded the file.
After Parsing the File (Step 2): After the file is read and analyzed, save the analyzed data, for instance, rows and columns extracted from the file, the structure of the file. Record the change of the progress to “Step 2”. You can also accumulate any errors or invalid URLs parsed at this point as well as any other data wanted to be stored.
After Data Review (Step 3): Following the user reviews the data and perhaps, makes corrections, update the database of the user changes or highlight and complete the process with the “Step 3”.  

4. Read User Progress on page load
Each time the user comes back to the application or reloads the page, you have get their progress from the database. Based on the current step stored in the database, you can direct the user back to the appropriate part of the process:
If Step 1 is stored: The user is still at the file upload part hence display the upload page.
If Step 2 is stored: The user has already uploaded the file so one should display the parsed data or the error checking web page.
If Step 3 is stored: The user is on the review or submission step, therefore, take him through the remaining steps.
By retrieving this progress from the database, the app guarantees that the user would be able to continue using the application from the exact point he stopped no matter whether he switched to another device or a different session.

5. Deal Data for Every Process
Every stage of the process could deal with different types of data, for example, file data for the first step of the process, parsed data for the second step and modified data for the next step. This means that this data must be stored in the database coupled with the current step. For each step:
Step 1 (File Upload): Save information regarding the uploaded file (e. g. name of the file, type of the file etc. ).
Step 2 (Parsing and Error Checking): Save it back the parsed data, the list of URLs that failed to parse, the fields that are empty, and the errors that you have come across.
Step 3 (Review and Submission): Store all modifications which were introduced by the user and construct the final payload for submission.
This way all the important details are kept recorded to allow the user to continue from the point that they left.

6. Ensuring Data Consistency
To prevent issues such as users revisiting earlier steps or refreshing mid-process:
Ensure that each step update is atomic, meaning each step is fully completed before being updated in the database.
Use transactions to handle critical processes (e.g., ensuring that parsed data and the current step are updated together).

7. User Experience on Page Load
When a user opens the app, the system should:
Query the database to fetch their current step and associated data.
Based on the current step, redirect them to the correct page in the process.
Preload any previously saved data (e.g., already uploaded files, corrected errors) so the user doesn't have to redo any work.
For example, if the user uploaded a file but didn’t complete the data review, the app will take them back to the review page, with the file already uploaded and parsed data shown.

## Scaling Strategies for Handling Large Files
When you're dealing with large files (like XL files with many rows and columns), there are a few challenges you might face:

This may probably be due to the fact that the file may take a considerable amount of time to upload.
The time is spent when opening the file, parsing it and checking for the errors, thus slowing down the app.
When lots of data is processed, the page containing the table may either stall or shut down.
 
1.Frontend Optimizations:-
File Upload in Chunks: If the given file is large, it is impractical to upload the whole file at once,to avoid these issues, the large file has to be divided into several small sub-files which are mainly referred to as chunks and then upload them one at a time. In this way, any file size can be transferred, and the completion time is short, thus users will not be required to wait for a long time.
Suppose I have a single file of 100MB; then I break it into 10 sub files of 10MB each and try to upload them one at a time. When one chunk has not been put in the right way, one has to resend just the involved chunk not the entire file.
Use Web Workers for Parsing: As far as I understand, parsing of large files can hamper the functionality of a browser and in the worst case scenario the app may appear to be unresponsive. When it comes to the parsing work, or file processing which may take some time, a Web Worker is initiated in the background to ensure the app is always active.
You can consider the Web Workers as the “assistants” that perform the time-consuming computations off stage, so that they do not interrupt the primary application. For instance if a Web Worker is compiling a large file your app will remain fluid and users can see the progress being made.
Show Data in Parts (Lazy Loading): For instance, if you get a large number of rows or column from big file, an attempt to load them may freeze the concerned page. However, these points can be made to load only the part of data as the requirement (lazy loading). You get more rows into view as the user scrolls to the bottom of the table.

2.Backend (Server) Optimizations:-
Handle File Uploads in Chunks: On the server side, it must be provided that the files can be uploaded in small portions so that it is similar to the frontend. When all chunks are uploaded, the server merges all the chunks as a whole file.
For instance, chunks ‘1’, ‘2’, ‘3’… up to chunk ‘10’ are sent by the frontend and are joined by the server to from the full file.
Process Large Files in Batches: If you’re working with a large file it may take a long time to process or use lots of memory, whereas if you split the file into chunks it will be much quicker. For instance, while dealing with a file having 10,000 rows you can set 1,000 rows for each turn. This makes the work of the server to be light and when demand for these services increases, it can be adjusted easily to meet the challenge.

Use Background Jobs for Heavy Work: It must be noted that this may take a very long time if the file is extremely large in its size. Rather than lock the user and force him to wait until the process is complete, then send the file to a background job the carries out the process by notifying the user when it’s done.
For instance, when a user uploads a large file,you can tell the user, “Processing in progress… we’ll be informing you when the process is complete.” This assists the user in not being fixed to his/her screen waiting for the file to be processed completely while using the application.
