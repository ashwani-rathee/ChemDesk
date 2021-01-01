import os

cmd = "./imago_console data.png -o data.mol"

returned_value = os.system(cmd)  # returns the exit code in unix
print('returned value:', returned_value)
