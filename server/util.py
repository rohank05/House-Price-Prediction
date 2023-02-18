import pickle
import json
import numpy as np

__locations = None
__data_columns = None
__model = None


# Since first 3 columns are sqft, bath and bhk. Rest are different location which is one hot encoded
def get_estimated_price(location, sqft, bhk, bath):
    try:
        loc_index = __data_columns.index(location)
    except:
        loc_index = -1
    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1
    return round(__model.predict([x])[0], 2)


def get_locations():
    return __locations


# Loading Prediction Model and Table Columns
def load_saved_artifacts():
    print("Loading Artifacts....")
    global __locations
    global __data_columns
    global __model
    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)["data_columns"]
        __locations = __data_columns[3:]
    with open("./artifacts/bangalore_price.pickle") as f:
        __model = pickle.load(f)


if __name__ == "__main__":
    load_saved_artifacts()
