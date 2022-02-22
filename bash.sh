# For Loop
for ((i = 0; i < 2; i++)); do
    echo $i
done


# Run provided CMD in another terminal and close after executing
gnome-terminal -- sh -c "echo hello from new terminal"