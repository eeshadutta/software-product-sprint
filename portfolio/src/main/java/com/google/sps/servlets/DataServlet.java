// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.*; 
import java.util.*; 
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

    static final String commentsTable = "Comment";

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Query query = new Query(commentsTable).addSort("timestamp", SortDirection.DESCENDING);

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery results = datastore.prepare(query);

        ArrayList<String> users = new ArrayList<>();
        ArrayList<String> comments = new ArrayList<>();
        ArrayList<String> datetimes = new ArrayList<>();

        for (Entity entity : results.asIterable()) {
            String user = (String) entity.getProperty("user");
            String comment = (String) entity.getProperty("comment");
            String datetime = (String) entity.getProperty("datetime");

            users.add(user);
            comments.add(comment);
            datetimes.add(datetime);
        }

        String json = convertToJson(users, comments, datetimes);
        
        response.setContentType("application/json;");
        response.getWriter().println(json);
    }

    private String convertToJson(ArrayList<String> users, ArrayList<String> comments, ArrayList<String> datetimes) {
        StringBuilder str = new StringBuilder();
        str.append("{");
        str.append("\"comments\": [");

        UserService userService = UserServiceFactory.getUserService();
        if (userService.isUserLoggedIn()) {
            for (int i = 0; i < comments.size(); i++) {
                str.append("{");
                str.append("\"user\": ");
                str.append("\"" + users.get(i) + "\"");
                str.append(", ");
                str.append("\"comment\": ");
                str.append("\"" + comments.get(i) + "\"");
                str.append(", ");
                str.append("\"datetime\": ");
                str.append("\"" + datetimes.get(i) + "\"");
                if (i == comments.size() - 1)
                    str.append("}");
                else
                    str.append("}, ");
            }
        }
        str.append("]}");
        
        String json = str.toString();
        return json;
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        UserService userService = UserServiceFactory.getUserService();
        
        String user = userService.getCurrentUser().getEmail();
        String comment = request.getParameter("input-comment");
        long timestamp = System.currentTimeMillis();
        LocalDateTime now = LocalDateTime.now();

        String datetime = now.format(DateTimeFormatter.ISO_LOCAL_DATE);

        Entity commentEntity = new Entity("Comment");
        commentEntity.setProperty("user", user);
        commentEntity.setProperty("comment", comment);
        commentEntity.setProperty("timestamp", timestamp);
        commentEntity.setProperty("datetime", datetime);

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        datastore.put(commentEntity);

        response.sendRedirect("/index.html#contact");
    }
}
