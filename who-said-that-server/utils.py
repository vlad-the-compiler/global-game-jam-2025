from constants import OpCodes


def build_response(op: OpCodes, data=None) -> dict:
    resp = {"op": op.value}
    if data:
        resp["data"] = data
    return resp
