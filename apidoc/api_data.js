define({ "api": [
  {
    "group": "Items",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/items/allItems",
    "title": "To get all Items",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"All Items Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"listId\": \"kdWgdNbvr\",\n            \"itemId\": \"qtcX9XSmw\",\n            \"itemName\": \"Item1\",\n            \"createdOn\": \"2018-09-23T05:42:50.493Z\",\n            \"modifiedOn\": \"2018-09-23T05:42:50.493Z\",\n            \"isDone\": false\n        },\n        {\n            \"listId\": \"X_cdkpxYp\",\n            \"itemId\": \"QetWHiP5a\",\n            \"itemName\": \"Private Item1\",\n            \"createdOn\": \"2018-09-23T13:50:25.941Z\",\n            \"modifiedOn\": \"2018-09-23T13:50:25.941Z\",\n            \"isDone\": true\n        },\n        ....................\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/item.js",
    "groupTitle": "Items",
    "name": "GetApiV1ItemsAllitems"
  },
  {
    "group": "Items",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/items/:listId/getItemsOfList",
    "title": "To get items of list",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"Item found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"listId\": \"X_cdkpxYp\",\n            \"itemId\": \"QetWHiP5a\",\n            \"itemName\": \"Private Item1\",\n            \"createdOn\": \"2018-09-23T13:50:25.941Z\",\n            \"modifiedOn\": \"2018-09-23T13:50:25.941Z\",\n            \"isDone\": false,\n            \"_id\": \"5ba79d4295c88122b440ed73\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"No Item Found\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"listId is missing\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/item.js",
    "groupTitle": "Items",
    "name": "GetApiV1ItemsListidGetitemsoflist"
  },
  {
    "group": "Items",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/items/createItem",
    "title": "To create item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the list(Parent of Item). (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemName",
            "description": "<p>Item name of the item. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isDone",
            "description": "<p>To make item Done or Open.(Default:false) (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"List's Item created successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"listId\": \"X_cdkpxYp\",\n        \"itemId\": \"QetWHiP5a\",\n        \"itemName\": \"Private Item1\",\n        \"createdOn\": \"2018-09-23T13:50:25.941Z\",\n        \"modifiedOn\": \"2018-09-23T13:50:25.941Z\",\n        \"isDone\": false,\n        \"_id\": \"5ba79d4295c88122b440ed73\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Failed to create item\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"parameters missing.\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/item.js",
    "groupTitle": "Items",
    "name": "PostApiV1ItemsCreateitem"
  },
  {
    "group": "Items",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/items/:itemId/delete",
    "title": "To delete single item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>Item ID of the item. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"Item Deleted\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"No Item Found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/item.js",
    "groupTitle": "Items",
    "name": "PostApiV1ItemsItemidDelete"
  },
  {
    "group": "Items",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/items/:itemId/edit",
    "title": "To edit details of item",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Item details edited/updated successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/item.js",
    "groupTitle": "Items",
    "name": "PutApiV1ItemsItemidEdit"
  },
  {
    "group": "Items",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/items/:itemId/markItemDone",
    "title": "To make item mark as done",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Task done successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/item.js",
    "groupTitle": "Items",
    "name": "PutApiV1ItemsItemidMarkitemdone"
  },
  {
    "group": "Items_History",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/itemsHistory/clearItemUndoHistory",
    "title": "To clear/delete undos for item.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"All Items Undos cleared\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 0,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Failed to clear undos\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/itemHistory.js",
    "groupTitle": "Items_History",
    "name": "GetApiV1ItemshistoryClearitemundohistory"
  },
  {
    "group": "Items_History",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/itemsHistory/getAllItemsHistory",
    "title": "To get all Items History",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"All History Items Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"listId\": \"0APE8GnLZ\",\n            \"itemId\": \"srF1_WnkR\",\n            \"itemName\": \"Public Item2\",\n            \"createdOn\": \"2018-09-25T17:32:07.009Z\",\n            \"modifiedOn\": \"2018-09-25T17:32:07.009Z\",\n            \"isDone\": false,\n            \"operationName\": \"Create\"\n        },\n        {\n            \"listId\": \"0APE8GnLZ\",\n            \"itemId\": \"9mUyx_qTa\",\n            \"itemName\": \"Public Item3\",\n            \"createdOn\": \"2018-09-25T17:32:07.009Z\",\n            \"modifiedOn\": \"2018-09-25T17:32:07.009Z\",\n            \"isDone\": false,\n            \"operationName\": \"Create\"\n        },\n        {\n            \"listId\": \"0APE8GnLZ\",\n            \"itemId\": \"9mUyx_qTa\",\n            \"itemName\": \"Public Item3\",\n            \"createdOn\": \"2018-09-25T17:32:07.009Z\",\n            \"modifiedOn\": \"2018-09-25T17:32:07.009Z\",\n            \"isDone\": false,\n            \"operationName\": \"Delete\"\n        },\n        ................\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/itemHistory.js",
    "groupTitle": "Items_History",
    "name": "GetApiV1ItemshistoryGetallitemshistory"
  },
  {
    "group": "Items_History",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/itemsHistory/:listId/getLastItem",
    "title": "To get last-items of list",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"Last item of list Found\",\n    \"status\": 200,\n    \"data\": {\n        \"_id\": \"5baa73af32209c0ab82da739\",\n        \"listId\": \"0APE8GnLZ\",\n        \"itemId\": \"Krwx9uwll\",\n        \"itemName\": \"Item1\",\n        \"createdOn\": \"2018-09-25T17:32:07.009Z\",\n        \"modifiedOn\": \"2018-09-25T17:32:07.009Z\",\n        \"isDone\": false,\n        \"operationName\": \"Create\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"No Items History Found\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"listId is missing\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/itemHistory.js",
    "groupTitle": "Items_History",
    "name": "GetApiV1ItemshistoryListidGetlastitem"
  },
  {
    "group": "Items_History",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/itemsHistory/:itemId/deleteFromHistory",
    "title": "To delete single item from History.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>Item ID of the item. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"Item Deleted from history\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"No Item Found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/itemHistory.js",
    "groupTitle": "Items_History",
    "name": "PostApiV1ItemshistoryItemidDeletefromhistory"
  },
  {
    "group": "Items_History",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/itemsHistory/saveHistoryItem",
    "title": "To save item in History.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the list(Parent of Item). (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of the Item. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemName",
            "description": "<p>Item name of the item. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isDone",
            "description": "<p>To make item Done or Open.(Default:false). (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "operationName",
            "description": "<p>To identify action performed on Item. (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"Item saved in history successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"listId\": \"X_cdkpxYp\",\n        \"itemId\": \"QetWHiP5a\",\n        \"itemName\": \"Private Item1\",\n        \"createdOn\": \"2018-09-23T13:50:25.941Z\",\n        \"modifiedOn\": \"2018-09-23T13:50:25.941Z\",\n        \"isDone\": false,\n         \"operationName\" : \"Create\",\n        \"_id\": \"5ba79d4295c88122b440ed73\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Failed to save item\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"parameters missing.\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/itemHistory.js",
    "groupTitle": "Items_History",
    "name": "PostApiV1ItemshistorySavehistoryitem"
  },
  {
    "group": "Lists",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/allLists",
    "title": "To get all lists",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"All List Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"createdOn\": \"2018-09-20T05:42:07.421Z\",\n            \"modifiedOn\": \"2018-09-20T05:42:07.421Z\",\n            \"listId\": \"RszfSE0Nj\",\n            \"listName\": \"Public List1\",\n            \"userId\": \"eKOTSdkn7\",\n            \"creator\": \"Mayur Mahamune\",\n            \"private\": false\n        },\n        {\n            \"createdOn\": \"2018-09-20T06:44:28.957Z\",\n            \"modifiedOn\": \"2018-09-20T06:44:28.957Z\",\n            \"listId\": \"X_cdkpxYp\",\n            \"listName\": \"Private List1\",\n            \"userId\": \"eKOTSdkn7\",\n            \"creator\": \"Mayur Mahamune\",\n            \"private\": true\n        },\n        {\n            \"createdOn\": \"2018-09-20T17:33:50.336Z\",\n            \"modifiedOn\": \"2018-09-20T17:33:50.336Z\",\n            \"listId\": \"lpYuD5WBL\",\n            \"listName\": \"List1\",\n            \"userId\": \"SKoxY63e5\",\n            \"creator\": \"Raju Rastogi\",\n            \"private\": true\n        },\n        ................\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/list.js",
    "groupTitle": "Lists",
    "name": "GetApiV1ListsAlllists"
  },
  {
    "group": "Lists",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/:userId/getAllListsOfUser",
    "title": "To get lists of user",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"List found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"createdOn\": \"2018-09-20T05:42:07.421Z\",\n            \"modifiedOn\": \"2018-09-20T05:42:07.421Z\",\n            \"_id\": \"5ba3357f6e6c410df889288d\",\n            \"listId\": \"RszfSE0Nj\",\n            \"listName\": \"Public List1\",\n            \"userId\": \"eKOTSdkn7\",\n            \"creator\": \"Mayur Mahamune\",\n            \"private\": false,\n            \"__v\": 0\n        },\n        {\n            \"createdOn\": \"2018-09-20T06:44:28.957Z\",\n            \"modifiedOn\": \"2018-09-20T06:44:28.957Z\",\n            \"_id\": \"5ba3447c709c2b0a4826d2b9\",\n            \"listId\": \"X_cdkpxYp\",\n            \"listName\": \"Private List1\",\n            \"userId\": \"eKOTSdkn7\",\n            \"creator\": \"Mayur Mahamune\",\n            \"private\": true,\n            \"__v\": 0\n        },\n        ............\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/list.js",
    "groupTitle": "Lists",
    "name": "GetApiV1ListsUseridGetalllistsofuser"
  },
  {
    "group": "Lists",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/createList",
    "title": "To create list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>UserId of the user. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listName",
            "description": "<p>List name of the list. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "creator",
            "description": "<p>Name of the list creator. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "private",
            "description": "<p>To identify property of list(Public or Private). (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"TO-Do-List created successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"listId\": \"CcvsI9xtn\"\n        \"userId\": \"eKOTSdkn7\"\n        \"listName\": \"Public List2\"\n        \"creator\": \"Mayur Mahamune\"\n        \"private\": false\n        \"createdOn\": \"2018-09-23T11:50:23.820Z\"\n        \"modifiedOn\": \"2018-09-23T11:50:23.820Z\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Failed to create list\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/list.js",
    "groupTitle": "Lists",
    "name": "PostApiV1ListsCreatelist"
  },
  {
    "group": "Lists",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/:listId/delete",
    "title": "To delete single list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>List ID of the list. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"List Deleted\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"No List Found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/list.js",
    "groupTitle": "Lists",
    "name": "PostApiV1ListsListidDelete"
  },
  {
    "group": "Lists",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/lists/:listId/edit",
    "title": "To edit details of list",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"List details edited/updated successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/list.js",
    "groupTitle": "Lists",
    "name": "PutApiV1ListsListidEdit"
  },
  {
    "group": "SubItems",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/subItems/allSubItems",
    "title": "To get all Sub-Items",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"All Sub Items Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"itemId\": \"lSxsmB1Gu\",\n            \"subItemId\": \"DILCqc-EM\",\n            \"subItemName\": \"Sub-Item1\",\n            \"createdOn\": \"2018-09-19T15:33:59.865Z\",\n            \"modifiedOn\": \"2018-09-19T15:33:59.865Z\",\n            \"isDone\": false\n        },\n        {\n            \"itemId\": \"XNQ75qsoE\",\n            \"subItemId\": \"iW5FZs94O\",\n            \"subItemName\": \"Sub-Item1\",\n            \"createdOn\": \"2018-09-21T04:56:56.027Z\",\n            \"modifiedOn\": \"2018-09-21T04:56:56.027Z\",\n            \"isDone\": false\n        },\n        {\n            \"itemId\": \"QetWHiP5a\",\n            \"subItemId\": \"pVYv-3GOA\",\n            \"subItemName\": \"Sub-Item1\",\n            \"createdOn\": \"2018-09-23T13:50:26.069Z\",\n            \"modifiedOn\": \"2018-09-23T13:50:26.069Z\",\n            \"isDone\": false\n        },\n        ...............\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/subItem.js",
    "groupTitle": "SubItems",
    "name": "GetApiV1SubitemsAllsubitems"
  },
  {
    "group": "SubItems",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/subItems/:itemId/getSubItemsOfItem",
    "title": "To get sub-items of items",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"Sub-Item found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"itemId\": \"QetWHiP5a\",\n            \"subItemId\": \"pVYv-3GOA\",\n            \"subItemName\": \"Sub-Item1\",\n            \"createdOn\": \"2018-09-23T13:50:26.069Z\",\n            \"modifiedOn\": \"2018-09-23T13:50:26.069Z\",\n            \"isDone\": false,\n            \"_id\": \"5ba7a25e95c88122b440ed74\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"No Sub-Item Found\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"itemId is missing\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subItem.js",
    "groupTitle": "SubItems",
    "name": "GetApiV1SubitemsItemidGetsubitemsofitem"
  },
  {
    "group": "SubItems",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/subItems/createSubItems",
    "title": "To create sub-item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of the item(Parent of Sub-Item). (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemName",
            "description": "<p>Sub-Item name of the SubItem. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isDone",
            "description": "<p>To make sub-item Done or Open.(Default:false) (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"Item's sub-item created successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"itemId\": \"QetWHiP5a\",\n        \"subItemId\": \"pVYv-3GOA\",\n        \"subItemName\": \"Sub-Item1\",\n        \"createdOn\": \"2018-09-23T13:50:26.069Z\",\n        \"modifiedOn\": \"2018-09-23T13:50:26.069Z\",\n        \"isDone\": false,\n        \"_id\": \"5ba7a25e95c88122b440ed74\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Failed to create sub-item\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"parameters missing.\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subItem.js",
    "groupTitle": "SubItems",
    "name": "PostApiV1SubitemsCreatesubitems"
  },
  {
    "group": "SubItems",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/subItems/:subItemId/delete",
    "title": "To delete single sub-item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemId",
            "description": "<p>Sub-Item ID of the sub-item. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"Sub-Item Deleted\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"No Sub-Item Found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subItem.js",
    "groupTitle": "SubItems",
    "name": "PostApiV1SubitemsSubitemidDelete"
  },
  {
    "group": "SubItems",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/subItems/:subItemId/edit",
    "title": "To edit details of sub-item",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Sub-Item details edited/updated successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/subItem.js",
    "groupTitle": "SubItems",
    "name": "PutApiV1SubitemsSubitemidEdit"
  },
  {
    "group": "SubItems",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/subItems/:subItemId/markSubItemDone",
    "title": "To make sub-item mark as done",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Sub-Task done successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/subItem.js",
    "groupTitle": "SubItems",
    "name": "PutApiV1SubitemsSubitemidMarksubitemdone"
  },
  {
    "group": "SubItems_History",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/subItemsHistory/clearSubItemUndoHistory",
    "title": "To clear/delete undos for sub-item.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"All Sub-Items Undos cleared\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 0,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Failed to clear undos\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subItemHistory.js",
    "groupTitle": "SubItems_History",
    "name": "GetApiV1SubitemshistoryClearsubitemundohistory"
  },
  {
    "group": "SubItems_History",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/subItemsHistory/getAllSubItemsHistory",
    "title": "To get all Sub-Items History",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"All History Sub-Items Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"itemId\": \"norXKAeas\",\n            \"subItemId\": \"VdadL46Da\",\n            \"subItemName\": \"Sub-item1\",\n            \"createdOn\": \"2018-09-25T17:32:07.021Z\",\n            \"modifiedOn\": \"2018-09-25T17:32:07.021Z\",\n            \"isDone\": false,\n            \"operationName\": \"Delete\"\n        },\n        ....................\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"No history sub-items Found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subItemHistory.js",
    "groupTitle": "SubItems_History",
    "name": "GetApiV1SubitemshistoryGetallsubitemshistory"
  },
  {
    "group": "SubItems_History",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/subItemsHistory/:itemId/getLastSubItem",
    "title": "To get last-sub-item.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"Last sub-item of item Found\",\n    \"status\": 200,\n    \"data\": {\n        \"_id\": \"5baa7b6c32209c0ab82da741\",\n        \"itemId\": \"norXKAeas\",\n        \"subItemId\": \"iALy9fKhc\",\n        \"subItemName\": \"Sub1\",\n        \"createdOn\": \"2018-09-25T17:32:07.021Z\",\n        \"modifiedOn\": \"2018-09-25T17:32:07.021Z\",\n        \"isDone\": false,\n        \"operationName\": \"Create\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"No Sub-Items History Found\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"listId is missing\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subItemHistory.js",
    "groupTitle": "SubItems_History",
    "name": "GetApiV1SubitemshistoryItemidGetlastsubitem"
  },
  {
    "group": "SubItems_History",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/subItemsHistory/saveHistorySubItem",
    "title": "To save sub-item in History.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of the Item(Parent of Sub-Item). (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemId",
            "description": "<p>subItemId of the SubItem. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemName",
            "description": "<p>SubItem name of the sub-item. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isDone",
            "description": "<p>To make item Done or Open.(Default:false). (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "operationName",
            "description": "<p>To identify action performed on Sub-Item. (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"Sub-Item saved in history successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"itemId\": \"X_cdkpxYp\",\n        \"subItemId\": \"QetWHiP5a\",\n        \"subItemName\": \"Private SubItem1\",\n        \"createdOn\": \"2018-09-23T13:50:25.941Z\",\n        \"modifiedOn\": \"2018-09-23T13:50:25.941Z\",\n        \"isDone\": false,\n         \"operationName\" : \"Create\",\n        \"_id\": \"5ba79d4295c88122b440ed73\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Failed to save sub-item\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"parameters missing.\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subItemHistory.js",
    "groupTitle": "SubItems_History",
    "name": "PostApiV1SubitemshistorySavehistorysubitem"
  },
  {
    "group": "SubItems_History",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/subItemsHistory/:subItemId/deleteSubItemFromHistory",
    "title": "To delete single sub-item from History.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemId",
            "description": "<p>SubItem ID of the subitem. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"Sub-Item Deleted from history\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"No Sub-Item Found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subItemHistory.js",
    "groupTitle": "SubItems_History",
    "name": "PostApiV1SubitemshistorySubitemidDeletesubitemfromhistory"
  },
  {
    "group": "Users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:userId/userDetails",
    "title": "To get details of user",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"User Details Found\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"eKOTSdkn7\",\n        \"firstName\": \"Mayur\",\n        \"lastName\": \"Mahamune\",\n        \"email\": \"mayurmahamune7@gmail.com\",\n        \"mobileNumber\": \" 91-undefined\",\n        \"country\": \"IN\",\n        \"userVerificationStatus\": true,\n        \"requests\": [],\n        \"friends\": [\n            {\n                \"friendId\": \"SKoxY63e5\",\n                \"friendName\": \"Raju Rastogi\",\n                \"action\": \"Accept\"\n            }\n        ],\n        \"createdOn\": \"2018-09-19T06:40:15.000Z\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "GetApiV1UsersUseridUserdetails"
  },
  {
    "group": "Users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:userId/verifyUser",
    "title": "for the email verification of user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>UserId of the user. (route params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"user found & verified\",\n    \"status\": 200,\n    \"data\": \"User Verified Successfully\"\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "GetApiV1UsersUseridVerifyuser"
  },
  {
    "group": "Users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/view/allUsers",
    "title": "To get All users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"All User Details Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"userId\": \"eKOTSdkn7\",\n            \"firstName\": \"Mayur\",\n            \"lastName\": \"Mahamune\",\n            \"password\": \"$2b$10$fQHYrFiuqMhDkRZDOCWPeuRAu25vEDAmdTYOrFhw.3CSdSJS/GL2e\",\n            \"email\": \"mayurmahamune7@gmail.com\",\n            \"mobileNumber\": \" 91-7276789024\",\n            \"country\": \"IN\",\n            \"userVerificationStatus\": true,\n            \"requests\": [],\n            \"friends\": [\n                {\n                    \"friendId\": \"SKoxY63e5\",\n                    \"friendName\": \"Raju Rastogi\",\n                    \"action\": \"Accept\"\n                }\n            ],\n            \"createdOn\": \"2018-09-19T06:40:15.000Z\"\n        },\n        ..........\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "GetApiV1UsersViewAllusers"
  },
  {
    "group": "Users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgotPassword",
    "title": "Forgot Password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User Details Found\",\n    \"status\": 200,\n    \"data\": \"Mail sent successfully\"\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n\n{\n    \"error\": true,\n    \"message\": \"User email address is missing\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "\n\n{\n    \"error\": true,\n    \"message\": \"failed to find the user with given email\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "\n\n{\n    \"error\": true,\n    \"message\": \"No user Details Found\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "PostApiV1UsersForgotpassword"
  },
  {
    "group": "Users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "Login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n\"error\": false,\n\"message\": \"Login Successful\",\n\"status\": 200,\n\"data\": {\n    \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9DkxLXVuZGVmaW5lZCIsImNvdW50cnkiOiJJTiIsInVzZXJWZXJpZmljYXRpb25TdGF0dXMiOnRydWUsInJlcXVlc3RzIjpbXSwiZnJpZW5kcyI6W3siZnJpZW5kSWQiOiJTS294WTYzZTUiLCJmcmllbmROYW1lIjoiUmFqdSBSYXN0b2dpIiwiYWN0.\",\n    \"userDetails\": {\n        \"userId\": \"eKOTSdkn7\",\n        \"firstName\": \"Mayur\",\n        \"lastName\": \"Mahamune\",\n        \"email\": \"mayurmahamune7@gmail.com\",\n        \"mobileNumber\": \" 91-7276789024\",\n        \"country\": \"IN\",\n        \"userVerificationStatus\": true,\n        \"requests\": [],\n        \"friends\": [\n            {\n                \"friendId\": \"SKoxY63e5\",\n                \"friendName\": \"Raju Rastogi\",\n                \"action\": \"Accept\"\n            }\n        ]\n    }\n}\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n              \"error\": true,\n              \"message\": \"Login Failed\",\n              \"status\": 500,\n              \"data\": null\n          }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "\n{\n                  \"error\": true,\n                  \"message\": \"Wrong Password.Login Failed\",\n                  \"status\": 400,\n                  \"data\": null\n              }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "Users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "Logout.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "Users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/resetPassword",
    "title": "Reset Password Link.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Mail sent Successfully\",\n    \"status\": 200,\n    \"data\": \"Password reset successful\"\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n\n{\n    \"error\": true,\n    \"message\": \"User-ID parameter is missing\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "\n\n{\n    \"error\": true,\n    \"message\": \"Password is missing\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "PostApiV1UsersResetpassword"
  },
  {
    "group": "Users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "To Signup user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of the user. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name of the user. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of ToDo account. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email ID of the user. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile number of the user. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "country",
            "description": "<p>Country of the user. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "userVerificationStatus",
            "description": "<p>For email verification of the user.(Default : false)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"User created\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"String\",\n        \"firstName\": \"String\",\n        \"lastName\": \"String\",\n        \"password\": \"String\"\n        \"email\": \"String\",\n        \"mobileNumber\": Number,\n        \"country\": \"String\"\n        \"userVerificationStatus\": false,\n        \"country\": [],\n        \"friends\": [],\n        \"createdOn\": \"Date\",                                    \n        \"_id\": \"5b816074f0fdc921608c6660\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Failed to create new User\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"User Already Present With this Email\",\n    \"status\": 403,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "Users",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/:userId/deleteUser",
    "title": "To delete single user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>User ID of the user. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"Deleted the user successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"No User Found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "PutApiV1UsersUseridDeleteuser"
  },
  {
    "group": "Users",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/:userId/edit",
    "title": "To edit details of user",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"User details edited\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Users",
    "name": "PutApiV1UsersUseridEdit"
  }
] });
