from dateutil.parser import parse as parse_date

def convert_value(value, field_type):
    if field_type == "int":
        return int(value)
    elif field_type == "float":
        return float(value)
    elif field_type == "bool":
        return bool(value.lower() == "true")
    elif field_type == "datetime":
        return parse_date(value)
    

    return value

